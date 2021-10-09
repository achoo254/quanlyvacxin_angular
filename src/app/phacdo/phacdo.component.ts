import { RegimenService } from './../service/Regimen.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Regimen } from '../obj/Regimen';

@Component({
  selector: 'app-phacdo',
  templateUrl: './phacdo.component.html',
  styleUrls: ['./phacdo.component.css']
})
export class PhacdoComponent implements OnInit {
  baseUrl : string = location.origin;
  id = this.router.snapshot.params.id;
  regimen : Regimen;
  constructor(private regimenService : RegimenService, private router: ActivatedRoute) { }

  ngOnInit(): void {
    this.ShowData();
  }

  ShowData(){
    this.regimenService.GetRegimenById(this.id).subscribe((data : Regimen) => {
      this.regimen = data;
    });
  }

}
