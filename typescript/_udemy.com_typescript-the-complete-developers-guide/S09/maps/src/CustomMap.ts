// BEGIN Solution 1-2

// import { User } from "./User";
// import { Company } from "./Company";

// END Solution 1-2

// BEGIN Solution 3

export interface Mappable {
  location: {
    lat: number;
    lng: number;
  };
  markerContent(): string;
  color: string;
}

// END Solution 3

// BEGIN Solution 1-2-3

export class CustomMap {
  private googleMap: google.maps.Map;

  constructor(divId: string) {
    this.googleMap = new google.maps.Map(document.getElementById(divId), {
      zoom: 1,
      center: {
        lat: 0,
        lng: 0
      }
    });
  }

  // BEGIN Solution 3

  addMarker(mappable: Mappable): void {
    const marker = new google.maps.Marker({
      map: this.googleMap,
      position: {
        lat: mappable.location.lat,
        lng: mappable.location.lng
      }
    });

    marker.addListener("click", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: mappable.markerContent()
      });

      infoWindow.open(this.googleMap, marker);
    });
  }

  // END Solution 3

  // BEGIN Solution 2

  //   addMarker(mappable: User | Company): void {
  //     new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: mappable.location.lat,
  //         lng: mappable.location.lng
  //       }
  //     });
  //   }

  // END Solution 2

  // BEGIN Solution 1

  //   addUserMarker(user: User): void {
  //     new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: user.location.lat,
  //         lng: user.location.lng
  //       }
  //     });
  //   }

  //   addCompanyMarker(company: Company): void {
  //     new google.maps.Marker({
  //       map: this.googleMap,
  //       position: {
  //         lat: company.location.lat,
  //         lng: company.location.lng
  //       }
  //     });
  //   }

  // END Solution 1
}

// END Solution 1-2-3
