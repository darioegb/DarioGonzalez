import { Component } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from '@angular/forms';
import { Location } from '@angular/common';
import {
  Subject,
  debounceTime,
  map,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs';

import { Product, ProductService } from '@modules/product/shared';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent {
  productForm!: FormGroup;
  product!: Product;
  isEdit = false;
  private unsubscribe$ = new Subject<void>();

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.getData();
  }

  get id() {
    return this.productForm?.get('id');
  }

  get name() {
    return this.productForm?.get('name');
  }

  get description() {
    return this.productForm?.get('description');
  }

  get logo() {
    return this.productForm?.get('logo');
  }

  get dateRelease() {
    return this.productForm?.get('date_release');
  }

  get dateRevision() {
    return this.productForm?.get('date_revision');
  }

  createForm() {
    this.productForm = this.fb.group({
      id: [
        '',
        [
          Validators.required,
          Validators.minLength(3),
          Validators.maxLength(10),
        ],
        this.checkIdAvailability.bind(this),
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(200),
        ],
      ],
      logo: ['', Validators.required],
      date_release: [
        '',
        [Validators.required, this.validateReleaseDate.bind(this)],
      ],
      date_revision: [
        '',
        [Validators.required, this.validateRevisionDate.bind(this)],
      ],
    });
  }

  checkIdAvailability(control: FormControl) {
    const id = control.value;
    return this.productService.checkIdAvailability(id).pipe(
      debounceTime(500),
      map((res) => {
        return !res || this.isEdit ? null : { idNotAvailable: true };
      })
    );
  }

  validateReleaseDate(control: FormControl) {
    const [year, month, day] = control.value.split('-');
    const releaseDate = new Date(year, month - 1, day);
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    return releaseDate >= currentDate ? null : { invalidReleaseDate: true };
  }

  validateRevisionDate(control: FormControl) {
    if (!this.dateRelease) {
      return;
    }
    const [revisionYear, revisionMonth, drevisionDay] =
      control.value.split('-');
    const [releaseYear, releaseMonth, releaseDay] =
      this.dateRelease.value.split('-');

    const releaseDate = new Date(releaseYear, releaseMonth - 1, releaseDay);
    const revisionDate = new Date(
      revisionYear,
      revisionMonth - 1,
      drevisionDay
    );
    releaseDate.setHours(0, 0, 0, 0);
    revisionDate.setHours(0, 0, 0, 0);
    const oneYearLater = new Date(
      releaseDate.getFullYear() + 1,
      releaseDate.getMonth(),
      releaseDate.getDate()
    );
    return revisionDate.getTime() === oneYearLater.getTime()
      ? null
      : { invalidRevisionDate: true };
  }

  getData(): void {
    this.route.params
      .pipe(takeUntil(this.unsubscribe$), withLatestFrom(this.route.data))
      .subscribe(([params, data]) => {
        if (params['id']) {
          this.isEdit = true;
          this.product = data['product'];
          this.setForm();
        }
      });
  }

  setForm(): void {
    this.productForm.patchValue({
      id: this.product.id,
      name: this.product.name,
      description: this.product.description,
      logo: this.product.logo,
      date_release: this.formatToISO8601Simplified(this.product.date_release),
      date_revision: this.formatToISO8601Simplified(this.product.date_revision),
    });
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit() {
    if (!this.productForm.valid) {
      this.productForm.markAllAsTouched();
    }

    const isNew = !this.product?.id;

    isNew
      ? this.productService
          .add({ ...this.productForm.value })
          .pipe(take(1))
          .subscribe({
            next: () => this.goBack(),
            error: () => this.goBack(),
          })
      : this.productService
          .update({ ...this.product, ...this.productForm.value })
          .pipe(take(1))
          .subscribe({
            next: () => this.goBack(),
            error: () => this.goBack(),
          });
  }

  private formatToISO8601Simplified(date: Date): string {
    const year: number = date.getFullYear();
    const month: string = String(date.getMonth() + 1).padStart(2, '0');
    const day: string = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }
}
