// Write your JS code here
import {Component} from 'react'
import './index.css'

class RegistrationForm extends Component {
  state = {
    inputFirstName: '',
    inputLastName: '',
    isFirstNameError: '',
    isLastNameError: '',
    isFormSubmitted: '',
  }

  validateFirstName = () => {
    const {inputFirstName} = this.state
    return inputFirstName !== ''
  }

  validateLastName = () => {
    const {inputLastName} = this.state
    return inputLastName !== ''
  }

  onChangeFirstName = event => {
    this.setState({inputFirstName: event.target.value})
  }

  onBlurFirstName = () => {
    const isFirstNameValid = this.validateFirstName()
    this.setState({isFirstNameError: !isFirstNameValid})
  }

  onChangeLastName = event => {
    this.setState({inputLastName: event.target.value})
  }

  onBlurLastName = () => {
    const isLastNameValid = this.validateLastName()
    this.setState({isLastNameError: !isLastNameValid})
  }

  onClickSubmitAnotherResponse = () => {
    this.setState(prevState => ({
      inputFirstName: '',
      inputLastName: '',
      isFormSubmitted: !prevState.isFormSubmitted,
    }))
  }

  onSubmitRegistrationForm = event => {
    event.preventDefault()
    const isFirstNameValid = this.validateFirstName()
    const isLastNameValid = this.validateLastName()
    if (isFirstNameValid && isLastNameValid) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        isFirstNameError: !isFirstNameValid,
        isLastNameError: !isLastNameValid,
        isFormSubmitted: false,
      })
    }
  }

  renderInputFirstName = () => {
    const {inputFirstName, isFirstNameError} = this.state
    const firstNameClassName = isFirstNameError
      ? 'input-name error'
      : 'input-name'

    return (
      <div className="input-container">
        <label className="label-element" htmlFor="firstName">
          First Name
        </label>
        <input
          type="text"
          className={firstNameClassName}
          id="firstName"
          value={inputFirstName}
          onChange={this.onChangeFirstName}
          onBlur={this.onBlurFirstName}
          placeholder="First name"
        />
      </div>
    )
  }

  renderInputLastName = () => {
    const {inputLastName, isLastNameError} = this.state
    const lastNameClassName = isLastNameError
      ? 'input-name error'
      : 'input-name'

    return (
      <div className="input-container">
        <label className="label-element" htmlFor="lastName">
          Last Name
        </label>
        <input
          type="text"
          className={lastNameClassName}
          id="lastName"
          value={inputLastName}
          onChange={this.onChangeLastName}
          onBlur={this.onBlurLastName}
          placeholder="Last name"
        />
      </div>
    )
  }

  renderRegistrationFormView = () => {
    const {isFirstNameError, isLastNameError} = this.state

    return (
      <form className="form-container" onSubmit={this.onSubmitRegistrationForm}>
        {this.renderInputFirstName()}
        {isFirstNameError && <p className="error-message">Required</p>}
        {this.renderInputLastName()}
        {isLastNameError && <p className="error-message">Required</p>}
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
    )
  }

  renderSubmittedSuccessfullyView = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        className="success-icon-image"
        alt="success"
      />
      <p className="submitted-successfully-text">Submitted Successfully</p>
      <button
        type="button"
        className="submit-button"
        onClick={this.onClickSubmitAnotherResponse}
      >
        Submit Another Response
      </button>
    </>
  )

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="registration-form-container">
        <h1 className="registration-form-heading">Registration</h1>
        <div className="registration-view-container">
          {!isFormSubmitted
            ? this.renderRegistrationFormView()
            : this.renderSubmittedSuccessfullyView()}
        </div>
      </div>
    )
  }
}

export default RegistrationForm
