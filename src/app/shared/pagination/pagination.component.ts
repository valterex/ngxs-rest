import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  @Input() itemsPerPage: number;
  @Input() itemsNumber: number;
  @Input() allPagesNumber: number;
  @Output() changePage: EventEmitter<number> = new EventEmitter<number>();

  private CURRENT_PAGE = 1;

  constructor() {}

  ngOnInit(): void {}

  get currentPage(): number {
    return this.CURRENT_PAGE;
  }

  set currentPage(page) {
    this.CURRENT_PAGE = page;
    this.changePage.emit(this.CURRENT_PAGE);
  }

  onFirstPage(): void {
    this.currentPage = 1;
  }

  onLastPage(): void {
    this.currentPage = this.allPagesNumber;
  }

  onNextPage(): void {
    this.currentPage += 1;
  }

  onPreviousPage(): void {
    this.currentPage -= 1;
  }
}
