import { PaginationResultDto } from "../../../../../../shared/global-components/dto/PaginationResultDto";

export class FilterPaginationBlogTuristico {
    name_route?: string;
    nombre?: string;
    summary?: string;
    content?: string;
    author?: string;
    date?: string;
    imageUrl?: string;
    category?: string;
    readTime?: number;
    rating?: number;
    ratingMP?: number;
    views?: number;
    featured?: boolean;
    status?: string;
    created_at?: string;
    lugarId?: string;
    paginationresult: PaginationResultDto = new PaginationResultDto();
}