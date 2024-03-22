import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IProduct, IProductRequest, IProductResponse } from '../../interfaces/posts.interface';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrl: './admin-products.component.scss'
})
export class AdminProductsComponent implements OnInit {
  public adminProducts: Array<IProductResponse> = [];
  public productForm!: FormGroup;

  public clickerSave!: boolean;
  public editID!: number;
  public clickerOpenForm!: boolean;
  public uploadPercent!: number;
  public isUploaded = false;
  private currentCategoryId = 0;

  constructor(
    private fb: FormBuilder,
    private postService: PostService,
    private storage: Storage
  ) { }

  ngOnInit(): void {
    this.initProductForm();
    this.loadProducts();
  }

  initProductForm(): void {
    this.productForm = this.fb.group({
      category: [null, Validators.required],
      title: [null, Validators.required],
      ingridients: [null, Validators.required],
      weight: [null, Validators.required],
      price: [null, Validators.required],
      img: [null, Validators.required]
    });

  }

  openForm(): void {
    this.clickerOpenForm = !this.clickerOpenForm;
  }

  loadProducts(): void {
    this.postService.getAllProducts().subscribe(data => {
      this.adminProducts = data;
      console.log(data);
    })
  }

  addPost(): void {
    if (this.clickerSave) {
      this.postService.updateProducts(this.productForm.value, this.currentCategoryId).subscribe(() => {
        this.loadProducts();
      })
    } else {
      this.postService.createProduct(this.productForm.value).subscribe(() => {
        this.loadProducts();
      })
    }
    // this.editStatus = false;
    this.clickerSave = false;
    this.productForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editPost(product: IProductResponse) {

    this.productForm.patchValue({
      category: product.category,
      title: product.title,
      ingridients: product.ingridients,
      weight: product.weight,
      price: product.price,
      img: product.img
    });

    // this.editStatus = true;
    this.currentCategoryId = product.id;
    this.isUploaded = true;
    this.editID = product.id;
    this.clickerSave = true;
  }

  deletePost(product: IProduct): void {
    const index = this.adminProducts.indexOf(product);
    if (index !== -1) {
      this.postService.delete(product.id).subscribe(() => {
        this.loadProducts();
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.productForm.patchValue({
          img: data
        });
        this.isUploaded = true;
      })
      .catch(err => {
        console.log(err);
      })
  }

  async uploadFile(folder: string, name: string, file: File | null): Promise<string> {
    const path = `${folder}/${name}`;
    let url = '';
    if (file) {
      try {
        const storageRef = ref(this.storage, path);
        const task = uploadBytesResumable(storageRef, file);
        percentage(task).subscribe(data => {
          this.uploadPercent = data.progress
        });
        await task;
        url = await getDownloadURL(storageRef);
      } catch (e: any) {
        console.error(e);
      }
    } else {
      console.log('wrong format');
    }
    return Promise.resolve(url);

  }

  deleteImage(): void {
    const task = ref(this.storage, this.valueByControl('img'));
    deleteObject(task).then(() => {
      console.log('File deleted');
      this.isUploaded = false;
      this.uploadPercent = 0;
      this.productForm.patchValue({
        img: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.productForm.get(control)?.value;
  }
}
