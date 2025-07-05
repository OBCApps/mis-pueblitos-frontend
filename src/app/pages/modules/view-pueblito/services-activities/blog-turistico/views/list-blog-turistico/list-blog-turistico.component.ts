import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { BlogPostList } from '../../entities/blog-post.dto';
import { BlogTuristicoService } from '../../../../../../../services/blog-turistico.service';
import { NavarComponent } from '../../../../../../navar/navar.component';
import { FilterPaginationBlogTuristico } from '../../entities/FilterPaginationBlogTuristico';
import { Constants } from '../../../../../../../shared/global-components/Constants';

@Component({
  selector: 'app-list-blog-turistico',
  standalone: true,
  imports: [CommonModule, FormsModule, NavarComponent],
  templateUrl: './list-blog-turistico.component.html',
  styleUrl: './list-blog-turistico.component.scss'
})
export class ListBlogTuristicoComponent {

  isLoading: boolean = false;
  viewMode: "grid" | "list" = "grid"

  constructor(
    private blogTuristicoService: BlogTuristicoService,
    private router: Router
  ) { }

  filter: FilterPaginationBlogTuristico = new FilterPaginationBlogTuristico();
  list_resultadoBusqueda: BlogPostList[] = []

  ngOnInit(): void {


    this.coreSearch()

  }



  coreClearFilter() {
    this.filter = new FilterPaginationBlogTuristico();
    this.coreSearch();
  }

  coreSearch() {
    this.isLoading = true;
    this.filter.status = 'AC'
    this.blogTuristicoService.get_blogs_turisticospaginado(this.filter).subscribe({
      next: (data: FilterPaginationBlogTuristico) => {
        this.filter = data;
        this.list_resultadoBusqueda = data.paginationresult.result;
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
      },
    })
  }


  toggleViewMode(): void {
    this.viewMode = this.viewMode === "grid" ? "list" : "grid"
  }

  setCurrentPage(page: number) {
    this.filter.paginationresult.page = page;
    this.coreSearch(); // vuelve a llamar al backend con la nueva página
  }


  goToDetailBlog(item: BlogPostList) {
    this.router.navigate([`${Constants.BLOG_TURISTICO_INFO_NAMEROUTE}/${item.name_route}`])
  }

  getCategory(category) {
    switch (category) {
      case 'EVTO': {
        return 'Evento'
      }
      case 'LUGR': {
        return 'Lugar'
      }
      case 'HOSP': {
        return 'Hospedaje'
      }
      case 'MISP': {
        return 'Mis Pueblitos'
      }
      case 'REST': {
        return 'Restaurante'
      }
      case 'ATUR': {
        return 'Atractivo Turístico'
      }
      case 'TIPV': {
        return 'Tips Viajero'
      }
      default: {
        return 'No Reconocido'
      }
    }

  }
}
