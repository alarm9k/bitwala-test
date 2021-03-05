import {Component, ReactNode} from 'react';
import {BlockchainBlock} from 'bitwala-challenge-common';
import {Spinner} from '../Spinner/Spinner';
import {RouteComponentProps, Link} from 'react-router-dom';
import {api} from '../api';
import './BlockView.scss';

interface State {
    fetching: boolean;
    block: BlockchainBlock | null;
    error: boolean;
}

interface MatchParams {
    blockId: string;
}

// In real life the state would be kept in a serializable store, preferably Redux.
// The side effects of fetching the data over the network would be extracted into
// separate routines using Redux Saga, Redux Observable or anything of that kind.
// Also some kind of client-side caching could be implemented to avoid excessive
// calls to the API.
export class BlockView extends Component<RouteComponentProps<MatchParams>, State> {
    state: State = {
        fetching: false,
        block: null,
        error: false
    }

    async componentDidMount() {
        this.setState({fetching: true, error: false});
        try {
            const block = await api.getBlock(this.props.match.params.blockId);
            this.setState({fetching: false, block, error: false});
        } catch (e) {
            this.setState({error: true, fetching: false});
        }

    }

    private getBlockDetails(): ReactNode {
        if (this.state.block) {
            return (
                <div className="block-details">
                    <div>
                        {Object.entries(this.state.block)
                            .map(([key, value], i) => {
                                return (
                                    <div className="detail" key={i}>
                                        <div className="key">{key}</div>
                                        <div className="value">{String(value)}</div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            );
        } else if (this.state.error) {
            return (
                <div className="error">Something's wrong</div>
            );
        }

        return null;
    }

    render(): ReactNode {
        return (
            <div className="BlockView">
                {
                    this.state.fetching
                        ? <Spinner/>
                        : this.getBlockDetails()
                }

                <div className="back">
                    <Link to="/">Back to list</Link>
                </div>
            </div>
        )
    }
}
