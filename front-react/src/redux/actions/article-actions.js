import API from '../apis/articles-api';
import { Types } from "../constants/user-type";
export function addArticles(params) {
	return async function (dispatch, getState) {
		try {
			let user = await API.addarticle(params);
			return user.data
			// dispatch({ type: Types.AUTHMESSAGE,payload: user.data});
		} catch (err) {}
	};
}
export function updateArticles(params){
	return async function (dispatch, getState) {
		try {
			let user = await API.update_article(params);
			return user.data
			// dispatch({ type: Types.AUTHMESSAGE,payload: user.data});
		} catch (err) {}
	};
}

export function getArticlebytopic(id) {
	return async function (dispatch, getState) {
		try {
			let user = await API.getarticle(id);
			return user.data;
			// dispatch({ type: Types.REGISTER_MESSAGE,payload: user.data});
		} catch (err) {}
	};
}

export function getArticlebyarticleId(id) {
	return async function (dispatch, getState) {
		try {
			let user = await API.getarticlebyid(id);
			return user.data;
			// dispatch({ type: Types.REGISTER_MESSAGE,payload: user.data});
		} catch (err) {}
	};
}