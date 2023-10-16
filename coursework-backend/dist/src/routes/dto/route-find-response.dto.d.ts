import PaginationResponseDto from 'src/dto/pagination-response.dto';
import { RouteEntity } from '../entities/route.entity';
export default class RouteFindResponseDto {
    meta: PaginationResponseDto;
    data: RouteEntity[];
}
