import { read_cookie } from "sfcookies";

export default function UseAuth() {
	const token = read_cookie("authorization");
	if( token.length <= 0){
		return false;	
	}
	return true;
};

