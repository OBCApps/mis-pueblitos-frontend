import { Component } from '@angular/core';
import { BlogPostDto } from '../../entities/blog-post.dto';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CommonModule, Location } from '@angular/common';
import { BlogTuristicoService } from '../../../../../../../services/blog-turistico.service';
import { Constants } from '../../../../../../../shared/global-components/Constants';
import { NavarComponent } from '../../../../../../navar/navar.component';

@Component({
  selector: 'app-manage-blog-turistico',
  standalone: true,
  imports: [CommonModule, NavarComponent],
  templateUrl: './manage-blog-turistico.component.html',
  styleUrl: './manage-blog-turistico.component.scss'
})
export class ManageBlogTuristicoComponent {

  dto: BlogPostDto | null = null;
  isLoading = true;
  currentImageIndex = 0;
  showImageModal = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private blogTuristicoService: BlogTuristicoService
  ) { }

  name_route: string;
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name_route = params['name_route'];
      this.coreSearch();
    });
  }

  coreSearch() {
    this.isLoading = true;

    this.blogTuristicoService.get_atractivos_turisticos_by_name_route(this.name_route).subscribe({
      next: (data: BlogPostDto) => {
        this.dto = data;
        this.isLoading = false
      },
      error: (error) => {
        this.isLoading = false
      },
    })
  }



  goBack(): void {
    this.router.navigate([Constants.BLOG_TURISTICO_LIST])
  }

  sharePost(platform: string): void {
    const url = window.location.href;

    let shareUrl = '';
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${encodeURIComponent(url)}`;
        break;
    }

    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
    }
  }

  openImageModal(index: number): void {
    this.currentImageIndex = index;
    this.showImageModal = true;
  }

  closeImageModal(): void {
    this.showImageModal = false;
  }

  nextImage(): void {
    if (this.dto?.fotos) {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.dto?.fotos.length;
    }
  }

  prevImage(): void {
    if (this.dto?.fotos) {
      this.currentImageIndex = this.currentImageIndex === 0
        ? this.dto.fotos.length - 1
        : this.currentImageIndex - 1;
    }
  }

  getStarArray(rating: number): boolean[] {
    return Array(5).fill(false).map((_, i) => i < Math.floor(rating));
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
