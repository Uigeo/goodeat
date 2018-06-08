import { Component, OnInit, ViewChild } from '@angular/core';
import { Food, History } from '../data';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { AuthService } from '../auth.service';
import { FoodService } from '../food.service';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-histroy',
  templateUrl: './histroy.component.html',
  styleUrls: ['./histroy.component.css']
})
export class HistroyComponent implements OnInit {

  displayedColumns = ['name', 'price', 'store', 'date'];
  dataSource: MatTableDataSource<History>;
  history: History[];

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(public auth: AuthService, public fs: FoodService, private afs: AngularFirestore) {
    this.getMyHistory();
  }


  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit() {
  }

  moveToDetail(id: string) {
    window.location.href = '/detail/' + id;
  }

  getMyHistory() {
    this.auth.getHistory().subscribe(history => {
      this.history = history;
      console.log(this.history, 'history');
      this.dataSource = new MatTableDataSource<History>(this.history);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}
