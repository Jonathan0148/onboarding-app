import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ApiResponse as ApiResponseType } from '../../common/interfaces/api-response.interface';
import { Product } from './entities/product.entity';
import { HttpStatusCodes, SwaggerMessages } from '../../common/constants';
import { ApiProductsResponses } from '../../common/decorators/swagger-responses.decorator';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Products')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) { }

  @Get()
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.PRODUCTS.SUMMARY_GET_ALL })
  @ApiProductsResponses(Product, 'GET_ALL')
  async findAll(@Query() pagination: PaginationDto): Promise<ApiResponseType<Product[]>> {
    return this.productsService.findAll(pagination);
  }

  @Get(':id')
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.PRODUCTS.SUMMARY_GET_ONE })
  @ApiProductsResponses(Product, 'GET_ONE')
  async findById(@Param('id') id: string): Promise<ApiResponseType<Product>> {
    return this.productsService.findOneById(id);
  }

  @Post()
  @HttpCode(HttpStatusCodes.CREATED)
  @ApiOperation({ summary: SwaggerMessages.PRODUCTS.SUMMARY_CREATE })
  @ApiProductsResponses(Product, 'CREATE')
  async create(@Body() dto: CreateProductDto): Promise<ApiResponseType<Product>> {
    return this.productsService.create(dto);
  }

  @Put(':id')
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.PRODUCTS.SUMMARY_UPDATE })
  @ApiProductsResponses(Product, 'UPDATE')
  async update(@Param('id') id: string, @Body() dto: UpdateProductDto): Promise<ApiResponseType<Product>> {
    return this.productsService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.PRODUCTS.SUMMARY_DELETE })
  @ApiProductsResponses(Product, 'DELETE')
  async delete(@Param('id') id: string): Promise<ApiResponseType<null>> {
    return this.productsService.delete(id);
  }
}
