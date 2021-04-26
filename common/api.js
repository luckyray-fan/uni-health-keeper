const HEALTH_API = {
	spu_list: 'spu/list',
	spu: 'spu/id',
	spu_ids: 'spu/ids',
	service: 'service/id',
	reserve: 'reserve/',
	order: 'order/',
	credit_sum: 'credit/sum',
	credit_list: 'credit/list',
	order_list: 'order/user',
	order_pay: 'order/pay',
	reserve_list: 'reserve/list',
	reserve_cancel: 'reserve/cancel',
	record_list: 'record/list',
	order_refund: 'order/refund',
	comment: 'comment'
}

Object.keys(HEALTH_API).map(i => {
	HEALTH_API[i] = 'http://localhost:3000/api/' + HEALTH_API[i];
})

export default HEALTH_API;