const rootElement = document.getElementById('root')

class App extends React.Component {	
	constructor(props) {
		super(props);
		this.state = { 
			editTask: false,
			editItem: {},
		};
	}
	
	componentDidMount() {
		this.getTasks()
	}
	
	componentDidUpdate(prevProps) {
		const { page, sortColumn, sortDirection } = this.props
		if (prevProps.page !== page || prevProps.sortColumn !== sortColumn || prevProps.sortDirection !== sortDirection) {
			this.getTasks()
		}
	}
	getTasks = () => {
		const { page, sortColumn, sortDirection } = this.props
		
		let url = 'https://uxcandy.com/~shapoval/test-task-backend/?developer=Mihail'
		url += `&sort_field=${sortColumn}`
		url += `&sort_direction=${sortDirection}`
		url += `&page=${page}`
		
		$.ajax({
			url,
			crossDomain: true,
			method: 'GET',
			mimeType: "application/json",
			dataType: "json",
			success: (data) => {
				let tasksTotalCount	= parseInt(data.message.total_task_count)
				let remainder = tasksTotalCount % 3
				let pagesCount = parseInt(tasksTotalCount / 3)
				if (remainder > 0) pagesCount += 1
				
				store.dispatch({
					type						: 'TASKS',
					tasks						: data.message.tasks,
					tasksTotalCount	: tasksTotalCount,
					pagesCount			: pagesCount,
				})
			}
		})
	}
	
	sortMe = (field) => {
		let direction = 'asc'
		if (this.props.sortColumn === field) {
			if (this.props.sortDirection === 'asc') {
				direction = 'desc'
			} else if (this.props.sortDirection === 'desc') {
				direction = 'asc'
			}
		}
		store.dispatch({
			type					: 'SORT',
			sortDirection	: direction,
			sortColumn		: field,
		})
	}
	
	leafList = (direction) => {
		let page = 1
		if (direction === 'next') {
			page = this.props.page + 1
		} else if (direction === 'prev') {
			page = this.props.page - 1
		}
		
		store.dispatch({
			type: 'LEAF', page
		})
	}
	
	handleLogin = (e) => {
		e.preventDefault()
		
		const username = e.target.username.value
		const password = e.target.password.value
		
		if (username === 'admin' && password === '123') {
			store.dispatch({
				type			: 'LOGIN',
				username	: 'admin',
			})
		}
	}
	
	handleNewTask = (e) => {
		e.preventDefault()
		
		const username = e.target.username.value
		const email = e.target.email.value
		const text = e.target.text.value
		
    $(document).ready(() => {
			var form = new FormData();
			form.append("username", username);
			form.append("email", email);
			form.append("text", text);

			$.ajax({
				url: 'https://uxcandy.com/~shapoval/test-task-backend/create?developer=Mihail',
				crossDomain: true,
				method: 'POST',
				mimeType: "multipart/form-data",
				contentType: false,
				processData: false,
				data: form,
				dataType: "json",
				success: (data) => {
					store.dispatch({
						type: 'LEAF', page: 1
					})
				}
			});
    });
	}
	
	startEditTask = (item) => {
		if (!this.props.loggedIn) return
		this.setState({
			editTask: true,
			editItem: item,
		})
	}
	stopEditTask = () => {
		this.setState({
			editTask: false,
			editItem: {},
		})
	}
	
	handleEditTask = (e) => {
		e.preventDefault()
		
		const status = e.target.status.value
		const text = e.target.text.value
		const { editItem } = this.state
		
		const params_string = encodeURIComponent(`status=${status}&text=${text}&token=beejee`)
		
    $(document).ready(() => {
			var form = new FormData();
			form.append("status", status);
			form.append("text", text);
			form.append("token", "beejee");
			form.append("signature", md5(params_string));
			
			
			$.ajax({
				url: `https://uxcandy.com/~shapoval/test-task-backend/edit/${editItem.id}?developer=Mihail`,
				crossDomain: true,
				method: 'POST',
				mimeType: "multipart/form-data",
				contentType: false,
				processData: false,
				data: form,
				dataType: "json",
				success: (data) => {
					this.getTasks()
				}
			});
    });
	}
	
	render() {		
		const { tasks, page, sortDirection, sortColumn, 
						tasksTotalCount, pagesCount, username, loggedIn } = this.props
		const { editTask, editItem } = this.state
		
		const rowStyle = status => status === 10 ? {textDecoration: 'line-through'} : {}
		const statusName = status => status === 10 ? 'готово' : 'активная'
		
		const getSortMark = (field) => {
			if (field === sortColumn) {
				if (sortDirection === 'asc') return <span>&darr;</span>
				if (sortDirection === 'desc') return <span>&uarr;</span>
			}
			return ''
		}
		
		return (
			<div>
				
				<div className="navbar navbar-default navbar-fixed-top" role="navigation" style={{backgroundColor:'#1db15c'}}>
					<div className="container">
					<div className="row">
						<div className="col-md-1">
						</div>
						<div className="col-md-9">
						<p className="lead"><h3 style={{color:'#FFF'}}>NAME_LABEL</h3></p>
						</div>
						<div className="col-md-2">
						<button className="btn btn-primary" style={{marginTop:'15px',marginBottom:'15px'}}>ВЫХОД</button>
						</div>
					</div>		
					</div>
				</div>
			
				<div className="container">
					<h1>{'todo list'}</h1>
					
					{!loggedIn &&
						<form onSubmit={this.handleLogin} style={{fontSize:'18px'}}>
							<input name="username" type="text" autoComplete='off' />
							<input name="password" type="password" />
							<button type="submit" className="btn btn-warning ">
								<b>OK</b>
							</button>
						</form>
					}
					{loggedIn &&
						<h4>{username}</h4>
					}
					
					<br/>
					
					<table className="table table-hover" style={{fontSize:'18px'}}>
						<tbody>
							<tr>
								<td onClick={() => this.sortMe('status')} className="table-head-active">
									Статус {getSortMark('status')}
								</td>
								<td onClick={() => this.sortMe('username')} className="table-head-active">
									Имя {getSortMark('username')}
								</td>
								<td onClick={() => this.sortMe('email')} className="table-head-active">
									E-mail {getSortMark('email')}
								</td>
								<td>Текст задачи</td>
							</tr>
						</tbody>
						<tbody style={{cursor:'pointer'}}>
							{tasks.map((item, index) => (
								<tr 
									key={item.id} 
									style={rowStyle(item.status)}
									onClick={() => this.startEditTask(item)}
								>
									<td>{statusName(item.status)}</td>
									<td>{item.username}</td>
									<td>{item.email}</td>
									<td>{item.text}</td>
								</tr>
							))}
						</tbody>
					</table>
					{!editTask &&
						<form onSubmit={this.handleNewTask} style={{fontSize:'18px'}}>
							<input name="username" type="text" autoComplete='off' placeholder="имя пользователя"/>
							<input name="email" type="text" autoComplete='off'  placeholder="e-mail"/>
							<input name="text" type="text" autoComplete='off' placeholder="задача" />
							<button type="submit" className="btn btn-warning ">
								<b>OK</b>
							</button>
						</form>
					}
					{editTask &&
						<div>
							<form onSubmit={this.handleEditTask} style={{fontSize:'18px'}}>
								<select name="status" 
									value={editItem.status}
									onChange={(e) => this.setState({
										editItem: {
											...editItem,
											status: e.target.value
										}
									})}
								>
									<option value={0}>активная</option>
									<option value={10}>готово</option>
								</select>
								<input name="text" 
									value={editItem.text} 								
									type="text" autoComplete='off'  placeholder="e-mail"
									onChange={(e) => this.setState({
										editItem: {
											...editItem,
											text: e.target.value
										}
									})}
								/>
								<button type="submit" className="btn btn-warning ">
									<b>OK</b>
								</button>
								<button className="btn btn-default" onClick={() => this.stopEditTask()}>
									<b>X</b>
								</button>
							</form>
							<br/>
						</div>
					}
					{tasks.length > 0 &&
						<div>
							{page > 1 &&
								<button className="btn btn-success" onClick={() => this.leafList('prev')}>
									{'<<'}
								</button>
							}
							&nbsp; {`${page} из ${pagesCount}`} &nbsp;
							{page < pagesCount &&
								<button className="btn btn-success" onClick={() => this.leafList('next')}>
									{'>>'}
								</button>
							}
						</div>
					}
				</div>
			</div>
		)
	}
}

const AppState = ReactRedux.connect(state => state)(App);

ReactDOM.render(
	<ReactRedux.Provider store={store}>
		<AppState />
	</ReactRedux.Provider>, 
	rootElement
)