import React from 'react'

class Layout extends React.Component {

  render() {
    return (
      <div className="layout-wrapper">
        <div className="layout">
          {
            this.props.children
          }
        </div>
      </div>
    )
  }

}

export default Layout;