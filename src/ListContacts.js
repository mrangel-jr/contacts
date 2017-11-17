import React, {Component} from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'


class ListContacts extends Component {
	
	static propTypes = {
		contacts: PropTypes.array.isRequired,
		onDeleteContact: PropTypes.func.isRequired
	}

	state = {
		query: ''
	}

	updateQuery = (query) => {
		this.setState({query: query.trim()})
	}

	clearQuery = () => {
		this.setState({query:''})
	}

	render () {
		const { contacts, onDeleteContact } = this.props
		const { query } = this.state //Desestruturação de objetos

		let showingContacts
		if (query) {
			const match = new RegExp(escapeRegExp(query),"i")
			showingContacts = contacts.filter((contact) => match.test(contact.name))
		} else {
			showingContacts = contacts
		}
		
		showingContacts.sort(sortBy('name'))

		return (
			<div className="list-contacts">
				<div className="list-contacts-top">
					<input 
						className='search-contacts'
						type='text'
						placeholder='Search Contacts'
						value={query}
						onChange={(event) => this.updateQuery(event.target.value)}
					/>
					<Link
						to="/create"
						className="add-contact"
					>Add Contact</Link>
				</div>

				{showingContacts.length !== contacts.length && (
					<div className="showing-contacts">
						<span>Now showing {showingContacts.length} of {contacts.length}</span>
						<button onClick={this.clearQuery}>
							Show All
						</button>
					</div>
				)}
				<ol className='contact-list'>
				{
					showingContacts.map( _ => (
						<li key={_.id} className='contact-list-item'>
							<div className='contact-avatar' style={{
								backgroundImage: `url(${_.avatarURL})`
							}}/>
							<div className='contact-details'>
								<p>{_.name}</p>
								<p>{_.email}</p>
							</div>
							<button onClick={() => onDeleteContact(_)} className='contact-remove'>
								Remove
							</button>
						</li>
						)
					)
				}
				</ol>
			</div>
		)
	}
}

export default ListContacts