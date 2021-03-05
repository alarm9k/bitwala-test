import {Component} from 'react';
import {api} from '../api';
import {BlockchainBlock, HashToBlock} from 'bitwala-challenge-common';
import {Spinner} from '../Spinner/Spinner';
import './ListView.scss';
import {RouteComponentProps} from 'react-router-dom';

interface State {
    fetching: boolean;
    blocks: HashToBlock;
    error: boolean;
}

// In real life the state would be kept in a serializable store, preferably Redux.
// The side effects of fetching the data over the network would be extracted into
// separate routines using Redux Saga, Redux Observable or anything of that kind.
// Also some kind of client-side caching could be implemented to avoid excessive
// calls to the API.
export class ListView extends Component<RouteComponentProps, State> {
    state: State = {
        fetching: false,
        blocks: {},
        error: false
    };

    async componentDidMount() {
        this.setState({fetching: true, error: false});
        try {
            const list = await api.getList();
            this.setState({fetching: false, blocks: list});
        } catch (e) {
            this.setState({fetching: false, error: true})
        }
    }

    private handleBlockClick(block: BlockchainBlock) {
        this.props.history.push(`/${block.hash}`);
    }

    private getBlocks() {
        if (this.state.error) {
            return (
                <div className="error">Something's wrong</div>
            )
        } else if (this.state.blocks && Object.keys(this.state.blocks).length > 0) {
            return (
                <div>
                    <div className="headers">
                        <div className="block-height column">Height</div>
                        <div className="block-hash column">Hash</div>
                        <div className="block-time column">Time</div>
                        <div className="block-main-chain column">Main chain</div>
                    </div>
                    {Object.values(this.state.blocks).map((block, i) => {
                        return (
                            <div className="block"
                                 key={i}
                                 onClick={() => this.handleBlockClick(block)}
                            >
                                <div className="block-height column">{block.height}</div>
                                <div className="block-hash column">{block.hash}</div>
                                <div className="block-time column">{block.time}</div>
                                <div className="block-main-chain column">{String(block.main_chain)}</div>
                            </div>
                        )
                    })}
                </div>
            )
        }

        return null;
    }

    render() {
        return (
            <div className="ListView">
                {
                    this.state.fetching
                        ? <Spinner/>
                        : this.getBlocks()
                }
            </div>
        );
    }
}

