import { Body, Controller, Get, HttpCode, Param, Post, Query, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { OnboardingService } from './onboarding.service';
import { CreateOnboardingDto } from './dto/create-onboarding.dto';
import { ApiResponse as ApiResponseType } from '../../common/interfaces/api-response.interface';
import { Onboarding } from './entities/onboarding.entity';
import { HttpStatusCodes, SwaggerMessages } from '../../common/constants';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiOnboardingResponses } from '../../common/decorators/swagger-responses.decorator';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@ApiTags('Onboarding')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('onboarding')
export class OnboardingController {
  constructor(private readonly onboardingService: OnboardingService) { }

  @Post()
  @HttpCode(HttpStatusCodes.CREATED)
  @ApiOperation({ summary: SwaggerMessages.ONBOARDING.SUMMARY_CREATE })
  @ApiOnboardingResponses(Onboarding, 'CREATE')
  async create(@Body() dto: CreateOnboardingDto): Promise<ApiResponseType<Onboarding>> {
    return this.onboardingService.create(dto);
  }

  @Get()
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.ONBOARDING.SUMMARY_GET_ALL })
  @ApiOnboardingResponses(Onboarding, 'GET_ALL')
  async findAll(@Query() pagination: PaginationDto): Promise<ApiResponseType<Onboarding[]>> {
    return this.onboardingService.findAll(pagination);
  }

  @Get(':id')
  @HttpCode(HttpStatusCodes.OK)
  @ApiOperation({ summary: SwaggerMessages.ONBOARDING.SUMMARY_GET_ONE })
  @ApiOnboardingResponses(Onboarding, 'GET_ONE')
  async findOneById(@Param('id') id: string): Promise<ApiResponseType<Onboarding>> {
    return this.onboardingService.findOneById(id);
  }
}
