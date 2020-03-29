// console.log("hi there!");

import { User } from "./User";
import { Company } from "./Company";
import { CustomMap } from "./CustomMap";

//google    // variable can be used from Developer Console

const user = new User();
const company = new Company();
const customMap = new CustomMap("map");

// console.log(user);
// console.log(company);

// BEGIN Solution 1-2

// customMap.addUserMarker(user);
// customMap.addCompanyMarker(company);

// END Solution 1-2

// BEGIN Solution 3

customMap.addMarker(user);
customMap.addMarker(company);

// END Solution 3
