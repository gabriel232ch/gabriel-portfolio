import { HOME_STATE } from './home';

export type ResearchId = 'chanel' | 'olist' | 'smaller-companies';
export const SITE_RESEARCH: readonly {id: ResearchId; title: string; shortTitle: string; homeHref: string; detailHref: string}[] = [
  {id:'chanel',title:HOME_STATE.projects.chanel.title,shortTitle:'Chanel',homeHref:'/#chanel',detailHref:HOME_STATE.projects.chanel.href},
  {id:'olist',title:HOME_STATE.projects.olist.title,shortTitle:'Olist',homeHref:'/#olist',detailHref:HOME_STATE.projects.olist.href},
  {id:'smaller-companies',title:HOME_STATE.projects.smallerCompanies.title,shortTitle:'Smaller companies',homeHref:'/#smaller-companies',detailHref:HOME_STATE.projects.smallerCompanies.href},
];
