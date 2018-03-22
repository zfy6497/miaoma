
import Util from "../libs/util.js";
import D from "../libs/date.js";

let formatDate = value => {
    return D.datetime(value);
}
export { formatDate }