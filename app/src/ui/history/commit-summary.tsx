import * as React from 'react'
import { FileChange } from '../../models/status'
import List from '../list'
import { Octicon, OcticonSymbol } from '../octicons'

interface ICommitSummaryProps {
  readonly summary: string
  readonly body: string
  readonly sha: string
  readonly authorName: string
  readonly files: ReadonlyArray<FileChange>
  readonly selectedFile: FileChange | null
  readonly onSelectedFileChanged: (file: FileChange) => void
}

export default class CommitSummary extends React.Component<ICommitSummaryProps, void> {
  private onSelectionChanged(row: number) {
    const file = this.props.files[row]
    this.props.onSelectedFileChanged(file)
  }

  private renderFile(row: number) {
    const file = this.props.files[row]
    return <div key={file.path}
                title={file.path}
                className='path'>{file.path}</div>
  }

  private rowForFile(file_: FileChange | null): number {
    const file = file_
    if (!file) { return -1 }

    let index = 0
    this.props.files.forEach((f, i) => {
      if (f.path === file.path) {
        index = i
        return
      }
    })
    return index
  }

  public render() {
    return (
      <div className='panel' id='commit-summary'>
        <div className='commit-summary-header'>
          <div className='commit-summary-title'>
            {this.props.summary}
          </div>

          <ul className='commit-summary-meta'>
            <li className='commit-summary-meta-item byline' aria-label='Author'>
              <span className='commit-summary-meta-icon'aria-hidden='true'>
                <Octicon symbol={OcticonSymbol.person} />
              </span>

              {this.props.authorName}
            </li>

            <li className='commit-summary-meta-item byline' aria-label='SHA'>
              <span className='commit-summary-meta-icon' aria-hidden='true'>
                <Octicon symbol={OcticonSymbol.gitCommit} />
              </span>
              {this.props.sha.slice(0,7)}
            </li>

            <li className='commit-summary-meta-item byline'>
              <span className='commit-summary-meta-icon' aria-hidden='true'>
                <Octicon symbol={OcticonSymbol.diff} />
              </span>
              {this.props.files.length} changed files
            </li>
          </ul>
        </div>
        <div className='commit-summary-description'>{this.props.body}</div>
        <div className='files'>
          <List rowRenderer={row => this.renderFile(row)}
                rowCount={this.props.files.length}
                rowHeight={40}
                selectedRow={this.rowForFile(this.props.selectedFile)}
                onSelectionChanged={row => this.onSelectionChanged(row)}/>
        </div>
      </div>
    )
  }
}
