import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditPopService {
  constructor() {}
  getOffsetRelativeToContainer(child: HTMLElement, container: HTMLElement) {
    const childRect = child.getBoundingClientRect();
    const containerRect = container.getBoundingClientRect();
    console.log(
      childRect,
      containerRect,
      container.scrollLeft,
      container.scrollTop
    );
    return {
      left: childRect.left - containerRect.left + container.scrollLeft,
      top: childRect.top - containerRect.top + container.scrollTop,
    };
  }
}
