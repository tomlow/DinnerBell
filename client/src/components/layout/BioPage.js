import React from "react"
import { Layout, Card } from 'antd'
import {
  GithubOutlined,
  LinkedinOutlined,
} from '@ant-design/icons'
const { Meta } = Card

const BioPage = (props) => {

  return <div className="bio">
    < Card
      className="bio-card"
      hoverable
      bordered={false}
      cover={< img alt="example" src="https://avatars.githubusercontent.com/u/62975710?s=460&u=386ccd63dc2b0ad6fc3c17fc69798844f98098d4&v=4" />}
      actions={
        [
          <a href="https://github.com/tomlow" target="_blank">
            <GithubOutlined key="github" />
          </a>,
          <a href="https://www.linkedin.com/in/tlow/" target="_blank">
            <LinkedinOutlined key="linkedin" />
          </a>
        ]}
    >
      <Meta
        title="Tom Low"
        description="English Major, Teacher, and Theater Maker turned Software Engineer. I live for the point where art and logic collide, and I'm thrilled to start this new career." />
    </Card >
  </div>
}

export default BioPage