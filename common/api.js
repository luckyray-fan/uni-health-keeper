const HEALTH_API = {
	spu_list: 'spu/list',
	spu: 'spu/id',
	service: 'service/id'
}

Object.keys(HEALTH_API).map(i => {
	HEALTH_API[i] = 'http://localhost:3000/api/' + HEALTH_API[i];
})

export default HEALTH_API;