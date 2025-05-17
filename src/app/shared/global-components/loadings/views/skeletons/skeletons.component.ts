import { NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BaseComponents } from '../../../BaseComponents';

@Component({
  selector: 'app-skeletons',
  standalone: true,
  imports: [NgFor, NgSwitch, NgSwitchCase, NgSwitchDefault],
  templateUrl: './skeletons.component.html',
  styleUrls: ['./skeletons.component.scss']
})
export class SkeletonComponent extends BaseComponents {
  @Input() typeSkeleton: string = 'default';



  constructor() {
    super();
  }

}
