class Location {
  latitude: string;
  longitude: string;
  needs_recording: string;
}

export interface AddressZipResponce {
  requestid: number;
  creationdate: number;
  status: string;
  completiondate: number;
  servicerequestnumber: string;
  typeofservicerequest: string;
  streetaddress: string;
  zipcode: number;
  xcoordinate: number;
  ycoordinate: number;
  ward: number;
  policedistrict: number;
  communityarea: number;
  latitude: number;
  longitude: number;
  location: Location;
  creationdateFormatted: string;
  completiondateFormatted: string;
}
