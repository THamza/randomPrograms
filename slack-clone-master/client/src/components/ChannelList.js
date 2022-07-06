import React, {Component} from "react";
import Button from "react-bootstrap/Button";
import ClipLoader from 'react-spinners/ClipLoader';
import {css} from '@emotion/core';

const override = css`
display: block;
margin: 0 auto;
border-color: #007bff;
margin-top: 100px;
`;


export default class ChannelList extends Component {

  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12 channelList">
            <ClipLoader
              css={override}
              sizeUnit={"px"}
              size={100}
              //color={'#007bff'}
              loading={this.props.isLoadingChannels}
            />
            <ul
              style={{
                listStyleType: "none",
                paddingLeft: "0px",
              }}
            >
              {this.props.channels.map(channel => {
                return (
                  <li
                    style={{paddingBottom: "5px"}}
                    key={channel.id}
                    value={channel.name}
                  >
                    <Button
                      type="button"
                      className="btn btn-primary btn-block"
                      onClick={() => this.props.selectChannel(channel)}
                    >
                      {channel.name}
                    </Button>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
