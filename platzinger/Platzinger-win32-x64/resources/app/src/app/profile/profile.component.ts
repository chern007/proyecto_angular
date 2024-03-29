import { Component, OnInit } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { FirebaseStorage } from 'angularfire2';
import { UserService } from '../services/user.service';
import { User } from "../interfaces/user";
import { AuthenticationService } from "../services/authentication.service";
import { AuthenticationGuard } from "../services/authentication.guard";
import { AngularFireStorage } from "angularfire2/storage"

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  
  user: User;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  picture: any;

  constructor(private userService: UserService, private authenticationService: AuthenticationService, private firebaseStorage: AngularFireStorage) {

    this.authenticationService.getStatus().subscribe((status) => {

      this.userService.getUserById(status.uid).valueChanges().subscribe((data: User) => {

        this.user = data;
        console.log(this.user);

      }, (error) => {

        console.log(error);

      });
    }, (error) => {

      console.log(error);

    });

  }

  ngOnInit(): void {
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
  }
  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  imageLoaded() {
    // show cropper
  }
  cropperReady() {
    // cropper ready
  }
  loadImageFailed() {
    // show message
  }

  saveSettings() {

    if (this.croppedImage) {

      const currentPictureId = Date.now();
      const pictures = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').putString(this.croppedImage, 'data_url');//subimos la imagen y la situamos en una carpeta

      pictures.then(result => {

        this.picture = this.firebaseStorage.ref('pictures/' + currentPictureId + '.jpg').getDownloadURL();//obtenemos la url de la imgen subida

        this.picture.subscribe((p) => {

          this.userService.setAvatar(p, this.user.uid).then(()=>{

            alert('Avatar subido correctamente');
            
          }).catch((error)=>{
            
            alert('Hubo un error al tratar de subir la imagen.');
            console.log(error);            

          });

        });

      }).catch(error => {

        console.log(error);

      });

    }
    else {

      this.userService.editUser(this.user).then(() => {

        alert("Cambios realizados!");

      }).catch(() => {

        alert("Hubo un error");

      });

    }

  }

}
