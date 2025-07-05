import { Injectable } from "@angular/core"
import { map, type Observable, of } from "rxjs"
import { BlogPostDto, BlogPostList } from "../pages/modules/view-pueblito/services-activities/blog-turistico/entities/blog-post.dto"
import { API_SERVICE_WEB } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { FilterPaginationBlogTuristico } from "../pages/modules/view-pueblito/services-activities/blog-turistico/entities/FilterPaginationBlogTuristico";

@Injectable({
    providedIn: "root",
})
export class BlogTuristicoService {
    private SERVER = API_SERVICE_WEB + '/blogTuristico/';

    constructor(
        private http: HttpClient,
    ) { }

    get_blogs_turisticospaginado(data: FilterPaginationBlogTuristico): Observable<FilterPaginationBlogTuristico> {
        return this.http.post<any>(`${this.SERVER}filter_paginationWeb`, data).pipe(
            map((response) => { return response })
        );
    }

    get_atractivos_turisticos_by_name_route(name_route: any): Observable<BlogPostDto> {
        return this.http.get<BlogPostDto>(`${this.SERVER}findDto_byNameRoute/${name_route}`).pipe(
            map((response) => { return response })
        );
    }
}
