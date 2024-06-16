<h3>匹配原理：</h3>
<h5>1、main主应用的配置</h5>
<ul>
<li>
	<h6>1.1 注册微应用</h6>
	<code>
	registerMicroApps([
	{
	   name: 'micro-vue2',
		entry: '/subprefix/', // 固定前缀1
		container: '#subapp-viewport2',
		activeRule: '/subapp',
		props: {}
	},
	])
		</code>
	</li>	
	<li>
		<h6>1.2 vue.config.js设置proxy代理转发</h6>
		<code>
		proxy: {
		      "/subprefix": { // 固定前缀2
		        target: "http://localhost:8085/",
		        changeOrigin: true,
		        ws: true,
		        secure: false,
		      },
		    }	
		</code>
	</li>
	<li>
		<h6>1.3 router配置</h6>
		<code>
		{
		    path: '/subapp/:pathMatch(.*)*',
		    name: 'subapp',
		    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
		  }
		</code>
	</li>
	<li>
		<h6>1.4 挂载container定义，AboutView.vue</h6>
		<code>
			......
			<div id="subapp-viewport2"></div>
			mounted() {
			    if (!window.qiankunStarted) {
			      window.qiankunStarted = true;
			      start();
			    }
			  }
			  ......
		</code>
	</li>
</ul>
<h5>2、sub-app微应用</h5>
<ul>
	<li>
		<h6>2.1 vue.config.js配置publicPath</h6>
		<code>publicPath: '/subprefix/', // 固定前缀3</code>
	</li>
</ul>
