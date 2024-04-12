import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BorrowsService } from 'src/app/services/borrows.service';
import { Utils } from 'src/app/utils/Utils';
import { Borrow } from 'src/entities/Borrows';

@Component({
  selector: 'app-list-borrow',
  templateUrl: './list-borrow.component.html',
  styleUrls: ['./list-borrow.component.css']
})
export class ListBorrowComponent {

  borrows: Borrow[] = [];
  constructor(private borrowsService:BorrowsService,private auth:AuthenticationService,private router:Router){
  }

  ngOnInit(){
    this.getUserBorrows();
    $(document).ready( function () {
      $('#borrowListDatatable').DataTable();
    });
  }

  returnBook(borrowId: number | undefined) {
    this.borrowsService.returnBook(borrowId).subscribe(
      {
        next :(next) => {
          Utils.showSweetAlert("success","Book returned successfully","success");
          window.location.reload();
        },
        error : (error)=>{
          console.log(error);
        }
      }
    )
  }

  getUserBorrows(){
    const userId : string | null = this.auth.loadLoggedUserId();
    this.borrowsService.getBorrowsByUser(userId).subscribe(
      {
        next : (borrows: Borrow[]) => {
          this.borrows = borrows;
          console.log(this.borrows);
        },
        error : (error) => {
          console.error('Error fetching borrows', error);
        }
      }
    );
  }

}
