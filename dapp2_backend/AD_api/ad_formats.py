# ads/ad_formats.py
class BaseAd:
    def handle(self, data):
        return {"status": "success", "message": "Default handler"}

class HomePageAd(BaseAd):
    def handle(self, data):
        return {"status": "success", "ad_type": "HomePage", "content": data}

class UserPageBannerAd(BaseAd):
    def handle(self, data):
        return {"status": "success", "ad_type": "UserPageBanner", "content": data}
class PopupVideoAd(BaseAd):
    def handle(self, data):
        return {"status": "success", "ad_type": "PopupVideo", "content": data}
class PopupBannerAd(BaseAd):
    def handle(self, data):
        return {"status": "success", "ad_type": "PopupBanner", "content": data}

AD_TYPE_HANDLERS = {
    1: HomePageAd(),
    2: PopupVideoAd(),
    3: PopupBannerAd(),
    4: UserPageBannerAd()
}
