import PaginationResponseDto from 'src/dto/pagination-response.dto';
import UserEntity from '../entities/user.entity';
export default class RouteFindResponseDto {
    meta: PaginationResponseDto;
    data: UserEntity[];
}
