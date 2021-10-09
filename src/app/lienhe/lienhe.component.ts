import { Contact } from './../obj/Contact';
import { ContactService } from './../service/Contact.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lienhe',
  templateUrl: './lienhe.component.html',
  styleUrls: ['./lienhe.component.css']
})
export class LienheComponent implements OnInit {
  baseUrl : string = location.origin;
  contact = new Contact();
  isValid = false;
  btnStatus : string = 'GỬI';
  constructor(private service: ContactService) { }

  ngOnInit(): void {

  }

  sendMail(){
    this.isValid = true;
    this.btnStatus = 'Đang gửi...';
    this.service.PostContact(this.contact).subscribe((response) => {
      this.btnStatus ='Cảm ơn Quý vị đã gửi góp ý cho chúng tôi. Vui lòng tải lại trang để gửi góp ý mới!';
      });
  }
}
