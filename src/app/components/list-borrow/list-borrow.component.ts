import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { BorrowsService } from 'src/app/services/borrows.service';
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
  }

  returnBook(borrowId: number) {
    this.borrowsService.returnBook(borrowId).subscribe(
      {
        next :(next) => {
          this.router.navigate(["/borrows"]);
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
