import produce from 'immer';

const initialized = {
  mainContents: [],
  isloadMainContents: false,
  solvedContents: [],
  isloadSolvedContents: false,
  solvingContents: [],
  isloadSolvingContents: false,
  stackContents: [],
  searchContents: [],
  editContent: null,
};

export const LOAD_MORE_CONTENTS = 'LOAD_MORE_CONTENTS';
export const LOAD_CONTENTS_SUCCESS = 'LOAD_CONTENTS_SUCCESS';

export const SOLVING_CONTENTS_SUCCESS = 'SOLVING_CONTENTS_SUCCESS';
export const LOAD_MORE_SOLVING_CONTENTS = 'LOAD_MORE_SOLVING_CONTENTS';

export const SOLVED_CONTENTS_SUCCESS = 'SOLVED_CONTENTS_SUCCESS';
export const LOAD_MORE_SOLVED_CONTENTS = 'LOAD_MORE_SOLVED_CONTENTS';

export const SET_CURRENT_SEARCH = 'SET_CURRENT_SEARCH';
export const SEARCH_CONTENTS_SUCCESS = 'SEARCH_CONTENTS_SUCCESS';
export const LOAD_MORE_SEARCH_SUCCESS = 'LOAD_MORE_SEARCH_SUCCESS';
export const INIT_SEARCH_CONTENTS = 'INIT_SEARCH_CONTENTS';

export const SET_CURRENT_STACK = 'SET_CURRENT_STACK';
export const STACK_CONTENTS_SUCCESS = 'STACK_CONTENTS_SUCCESS';
export const LOAD_MORE_STACK_SUCCESS = 'LOAD_MORE_STACK_SUCCESS';
export const INIT_STACK_CONTENTS = 'INIT_STACK_CONTENTS';

export const POST_CONTENT_SUCCESS = 'POST_CONTENT_SUCCESS';

export const DELETE_CONTENT_SUCCESS = 'DELETE_CONTENT_SUCCESS';

export const LOAD_USERCONTENTS_SUCCESS = 'LOAD_USERCONTENTS_SUCCESS';

export const EDIT_CONTENT_REQUEST = 'EDIT_CONTENT_REQUEST';

export const CONTENT_LIKE_REQUEST = 'CONTENT_LIKE_REQUEST';
export const CONTENT_UNLIKE_REQUEST = 'CONTENT_UNLIKE_REQUEST';

const reducer = (state = initialized, action) =>
  produce(state, draft => {
    switch (action.type) {
      case LOAD_USERCONTENTS_SUCCESS:
        draft.mainContents = [...action.data];
        break;
      case LOAD_CONTENTS_SUCCESS:
        draft.mainContents = [...action.data];
        draft.isloadMainContents = true;
        break;
      case EDIT_CONTENT_REQUEST:
        draft.editContent = action.data;
        break;
      case LOAD_MORE_CONTENTS:
        draft.mainContents = [...action.data];
        break;
      case CONTENT_LIKE_REQUEST:
        {
          const isLike = draft.mainContents.find(
            el => el.id === action.data.postId,
          );
          isLike.likers.push(action.data.userId);
        }
        break;
      case CONTENT_UNLIKE_REQUEST:
        {
          const isLike = draft.mainContents.find(
            el => el.id === action.data.postId,
          );
          isLike.likers = isLike.likers.filter(
            el => el.id !== action.data.userId,
          );
        }
        break;
      case SOLVING_CONTENTS_SUCCESS:
        draft.solvingContents = [...action.data];
        draft.isloadSolvingContents = true;
        break;
      case LOAD_MORE_SOLVING_CONTENTS:
        draft.solvingContents = [...action.data];
        break;
      case SOLVED_CONTENTS_SUCCESS:
        draft.solvedContents = [...action.data];
        draft.isloadSolvedContents = true;
        break;
      case LOAD_MORE_SOLVED_CONTENTS:
        draft.solvedContents = [...action.data];
        break;
      case STACK_CONTENTS_SUCCESS:
        draft.stackContents = [...action.data];
        break;
      case LOAD_MORE_STACK_SUCCESS:
        draft.stackContents = [...action.data];
        break;
      case INIT_STACK_CONTENTS:
        draft.stackContents = [];
        break;
      case SEARCH_CONTENTS_SUCCESS:
        draft.searchContents = [...action.data];
        break;
      case LOAD_MORE_SEARCH_SUCCESS:
        draft.searchContents = [...action.data];
        break;
      case INIT_SEARCH_CONTENTS:
        draft.searchContents = [];
        break;
      case POST_CONTENT_SUCCESS:
        draft.mainContents = [action.data, ...draft.mainContents];
        if (draft.solvingContents.length > 0) {
          draft.solvingContents = [action.data, ...draft.solvingContents];
        }
        break;
      case DELETE_CONTENT_SUCCESS:
        draft.mainContents = draft.mainContents.filter(
          v => v.id !== action.data,
        );
        draft.solvingContents = draft.solvingContents.filter(
          v => v.id !== action.data,
        );
        draft.solvedContents = draft.solvedContents.filter(
          v => v.id !== action.data,
        );
        break;
      default:
        break;
    }
  });

export default reducer;
