import { Component, OnInit } from '@angular/core';
import { PostService } from '../../services/post.service';
import { IPost, IPostResponse, IPostRequest } from '../../interfaces/posts.interface';
import { deleteObject, getDownloadURL, percentage, ref, Storage, uploadBytesResumable } from '@angular/fire/storage';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-admin-discounts',
  templateUrl: './admin-discounts.component.html',
  styleUrl: './admin-discounts.component.scss'
})
export class AdminDiscountsComponent implements OnInit {
  public adminDiscounts: Array<IPostResponse> = [];
  public discountForm!: FormGroup;

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
    const now = new Date();
    this.discountForm = this.fb.group({
      date: [new Date(now).toLocaleDateString('en-US')],
      title: [null, Validators.required],
      headline: [null, Validators.required],
      text: [null, Validators.required],
      img: [null, Validators.required]
    });

  }

  openForm(): void {
    this.clickerOpenForm = !this.clickerOpenForm;
  }

  loadPosts(): void {
    this.postService.getAll().subscribe(data => {
      this.adminDiscounts = data;
      console.log(data);
    })
  }

  addPost(): void {
    if (this.clickerSave) {
      this.postService.update(this.discountForm.value, this.currentCategoryId).subscribe(() => {
        this.loadPosts();
      })
    } else {
      this.postService.create(this.discountForm.value).subscribe(() => {
        this.loadPosts();
      })
    }
    // this.editStatus = false;
    this.clickerSave = false;
    this.discountForm.reset();
    this.isUploaded = false;
    this.uploadPercent = 0;
  }

  editPost(post: IPostResponse) {
    const now = new Date();

    this.discountForm.patchValue({
      date: [new Date(now).toLocaleDateString('en-US')],
      title: post.title,
      headline: post.headline,
      text: post.text,
      img: post.img
    });

    // this.editStatus = true;
    this.currentCategoryId = post.id;
    this.isUploaded = true;
    this.editID = post.id;
    this.clickerSave = true;
  }

  deletePost(post: IPost): void {
    const index = this.adminDiscounts.indexOf(post);
    if (index !== -1) {
      this.postService.delete(post.id).subscribe(() => {
        this.loadPosts();
      })
    }
  }

  upload(event: any): void {
    const file = event.target.files[0];
    this.uploadFile('images', file.name, file)
      .then(data => {
        this.discountForm.patchValue({
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
      this.discountForm.patchValue({
        imagePath: null
      })
    })
  }
  valueByControl(control: string): string {
    return this.discountForm.get(control)?.value;
  }
}
