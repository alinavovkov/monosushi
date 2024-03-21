import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { ICategory, ICategoryResponse, ICategoryRequest } from '../../interfaces/posts.interface';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-categories',
  templateUrl: './admin-categories.component.html',
  styleUrl: './admin-categories.component.scss'
})
export class AdminCategoriesComponent {
  public adminCategories: Array<ICategoryResponse> = [];
  public categoryForm!: FormGroup;

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
    this.initCategoryForm();
    this.loadPosts();
  }

  initCategoryForm(): void {
    // const now = new Date();
    const index = this.adminCategories.length;

    this.categoryForm = this.fb.group({
      id: index + 1,
      title: [null, Validators.required],
      way: [null, Validators.required],
      img: [null, Validators.required]
    });

  }

  openForm(): void {
    this.clickerOpenForm = !this.clickerOpenForm;
  }

  loadPosts(): void {
    this.postService.getAllCategories().subscribe(data => {
      this.adminCategories = data;
      console.log(data);
    })
  }

  addPost(): void {
    if (this.clickerSave) {
      this.postService.updateCategories(this.categoryForm.value, this.currentCategoryId).subscribe(() => {
        this.loadPosts();
      })
    } else {
      this.postService.createCategory(this.categoryForm.value).subscribe(() => {
        this.loadPosts();
      })
    }
    // this.editStatus = false;
    this.clickerSave = false;
    this.categoryForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editPost(category: ICategoryResponse) {
    // const index = this.adminCategories.indexOf(category);
    this.categoryForm.patchValue({
      // id: category.id,
      title: category.title,
      text: category.way,
      img: category.img
    });

    // this.editStatus = true;
    this.currentCategoryId = category.id;
    this.isUploaded = true;
    this.editID = category.id;
    this.clickerSave = true;
  }

  deletePost(category: ICategory): void {
    const index = this.adminCategories.indexOf(category);
    if (index !== -1) {
      this.postService.delete(category.id).subscribe(() => {
        this.loadPosts();
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.categoryForm.patchValue({
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
      this.categoryForm.patchValue({
        img: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.categoryForm.get(control)?.value;
  }
}
