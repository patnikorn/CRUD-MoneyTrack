import { FirebaseService } from './../firebase.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-data',
  templateUrl: './add-edit-data.page.html',
  styleUrls: ['./add-edit-data.page.scss'],
})
export class AddEditDataPage implements OnInit {

  isEdit: boolean;
  type: string;
  title: string;
  subTitle: string;
  amount: string;
  id: any;
  loading: boolean;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
  ) {
    this.route.params.subscribe((data:any) => {
      this.id =data.type;
      console.log(data.type);
      if(data.type == 'add'){
        this.isEdit = false;
      }else{
        this.isEdit = true;
        this.firebaseService.get_single_transaction(data.type).subscribe((data:any) => {
          console.log(data);
          this.type = data.type;
          this.title = data.title;
          this.subTitle = data.subTitle;
          this.amount = data.amount;

        })
      }
    })
  }

  ngOnInit() {
  }

  addTransaction(){
    this.loading = true;
    if(this.isEdit) {
      this.updateTransaction();
      return;
    }
    let data = {
      type: this.type,
      title: this.title,
      subTitle: this.subTitle,
      amount: this.amount,
    }
    this.firebaseService.add_transaction(data).then((res:any) => {
      console.log(res);
    this.loading = false;
    this.router.navigateByUrl('/home')
    })
  }

  updateTransaction(){
    let data = {
      type: this.type,
      title: this.title,
      subTitle: this.subTitle,
      amount: this.amount,
    }
    this.firebaseService.update_transaction(this.id,data).then((res:any) => {
      console.log(res);
      this.router.navigateByUrl('/home');
    })
  }

}