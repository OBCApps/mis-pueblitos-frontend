import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { IBreadCrumb } from './bread-crumb.interface';
import { filter, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-bread-crumb',
  standalone: true,
  imports: [],
  templateUrl: './bread-crumb.component.html',
  styleUrl: './bread-crumb.component.scss',
})
export class BreadCrumbComponent implements OnInit {
  public breadcrumbs: IBreadCrumb[];
  private previousUrl: string ="";
  private actualUrl: string ="";
  private previousData: IBreadCrumb = {
    label: "",
    url: "",
  };
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
  }

  ngOnInit() {
    this.router.events
      .pipe(
        filter((event: NavigationEnd) => event instanceof NavigationEnd),
        distinctUntilChanged()
      )
      .subscribe(() => {
        this.breadcrumbs = this.buildBreadCrumb(this.activatedRoute.root);
      });
  }
  ngAfterContentInit(): void {
    //Called after ngOnInit when the component's or directive's content has been initialized.
    //Add 'implements AfterContentInit' to the class.
    console.log("BREADCRUMB: ", this.breadcrumbs);
  }

  /**
   * Recursively build breadcrumb according to activated route.
   * @param route
   * @param url
   * @param breadcrumbs
   */
  buildBreadCrumb(
    route: ActivatedRoute,
    url: string = '',
    breadcrumbs: IBreadCrumb[] = []
  ): IBreadCrumb[] {
    let label =
      route.routeConfig && route.routeConfig.data
        ? route.routeConfig.data['breadcrumb']
        : '';

    let path =
      route.routeConfig && route.routeConfig.data ? route.routeConfig.path : '';

    const lastRoutePart = path.split('/').pop();
    const isDynamicRoute = lastRoutePart.startsWith(':');
    console.log('LAST ROUTE PART: ', lastRoutePart);
    if (lastRoutePart == 'department') {
      const queryParams = route.snapshot.queryParams;
      const departmentId = queryParams['departmentId'];
      const deparmentName = queryParams['departmentName'];
      label = deparmentName;
      path = `/department?departmentId=${departmentId}&departmentName=${deparmentName}`;
      this.previousData.label = label;
      this.previousData.url = path;
      this.previousUrl = lastRoutePart;
      this.actualUrl = lastRoutePart;
    } else if(lastRoutePart == "pueblitos"){
      this.actualUrl = lastRoutePart;
    }



    if (isDynamicRoute && !!route.snapshot) {
      const paramName = lastRoutePart.split(':')[1];
      path = path.replace(lastRoutePart, route.snapshot.params[paramName]);
      label = route.snapshot.params[paramName];
      console.log('LABEL: ', label);
    }

    const nextUrl = path ? `${url}/${path}` : url;

    const breadcrumb: IBreadCrumb = {
      label: label,
      url: nextUrl,
    };
    const newBreadcrumbs = breadcrumb.label
      ? [...breadcrumbs, breadcrumb]
      : [...breadcrumbs];
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    newBreadcrumbs.unshift({
      label: 'Inicio',
      url: '/',
    });

    if (this.previousData.label != "" && this.previousData.url != "" && this.previousUrl=="department") {
      console.log("dentro2:",this.previousUrl != this.actualUrl, this.previousUrl,this.actualUrl);
      console.log("despues:",this.previousData);
      newBreadcrumbs.splice(1, 0, {
        label: this.previousData.label,
        url: this.previousData.url,
      });
      console.log("newBreadcrumbs:",newBreadcrumbs);
    }
    console.log("newBreadcrumbs2:",newBreadcrumbs);
    return newBreadcrumbs;
  }

  isCurrentRoute(url: string): boolean {
    // si es la ultima ruta en el breadcrumb es la actual
    return this.breadcrumbs[this.breadcrumbs.length - 1].url === url;
  }

  changeName(input: any) {
    //console.log("INPUT: ", input);
    /* if(input == 'pueblitos') {
      const loca = JSON.parse(localStorage.getItem('lugar')).nombre;
      return loca ;
    } else {
      return input;
    } */
    return input;
  }
}
