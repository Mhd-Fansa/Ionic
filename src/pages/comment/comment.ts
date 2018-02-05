import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Comment } from '../../shared/comment';
import { Dish } from '../../shared/dish';
/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {

  commentForm: FormGroup;
  comment: Comment;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public viewCtrl: ViewController,
    private formBuilder: FormBuilder) {
      this.commentForm = this.formBuilder.group({
        author: ['', Validators.required],
        rating: 5,
        comment: ['', Validators.required]
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
  onSubmit() {
    console.log(this.commentForm.value);
    let commentValue = this.commentForm.value;
    commentValue['date'] = new Date();
    this.viewCtrl.dismiss(commentValue);
  }

}
