import { Component } from '@angular/core';

import { NavController, Platform, ToastController } from 'ionic-angular';

import { AdMobFree, AdMobFreeBannerConfig } from '@ionic-native/admob-free';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  admobId: any;
  idBanner: string;
  idInterstitial:string;
  platformCheck: any;

  constructor(
    private navController: NavController,
    private toastCtrl: ToastController,
    private adMobFree: AdMobFree,
    private platForm: Platform
  ) 
  {
    if (this.platForm.is('ios')) {
      this.idBanner = 'ca-app-pub-9309829064818731/6285912184'
    } else if (this.platForm.is('android')) {
      this.idBanner = 'ca-app-pub-9309829064818731/4815195643'
    }
    this.platformCheck = this.platForm._platforms;
    this.createToastPlatform(this.platformCheck);
  }


  createBanner() {

      const bannerConfig: AdMobFreeBannerConfig = {

        id: this.idBanner,
        isTesting: true,
        autoShow: true
      };
      this.adMobFree.banner.config(bannerConfig);

      this.adMobFree.banner.prepare()
        .then(() => {
          this.adMobFree.banner.show();
          this.createToast('createBanner');


        })
        .catch(e => console.log(e));
    
  }

  showInterstitial() {


    const interstitialConfig: AdMobFreeBannerConfig = {

      id: 'ca-app-pub-9309829064818731/5365736274',
      isTesting: true,
      autoShow: true
    };
    this.adMobFree.interstitial.config(interstitialConfig);

    this.adMobFree.interstitial.prepare()
      .then(() => {
        this.adMobFree.interstitial.show();
        this.createToast('interstitialBanner');


      })
      .catch(e => console.log(e));
  
  }

  showVideoRewardAd() {


    const rewardConfig: AdMobFreeBannerConfig = {

      id: 'ca-app-pub-9309829064818731/6211914089', //ios
      isTesting: true,
      autoShow: true
    };
    this.adMobFree.rewardVideo.config(rewardConfig);

    this.adMobFree.rewardVideo.prepare()
      .then(() => {
        this.adMobFree.rewardVideo.show();
        this.createToast('rewardVideo');


      })
      .catch(e => console.log(e));
  

  }

  createToast(string) {
    let toast = this.toastCtrl.create({
      message: 'Creating your ad ' + string,
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }
  createToastPlatform(platform) {
    let toast = this.toastCtrl.create({
      message: 'Platform your :' + platform,
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }

  removeBanner() {
    this.createToast('removeBanner');
    this.adMobFree.banner.hide();
  }
}