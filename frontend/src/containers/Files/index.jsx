import styled from 'styled-components';

// hooks
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';

// actions
import { getFiles, resetFiles, downloadFile, clearFileMessage } from '@actions';

// components
import Spinner from '@components/spinner';
import SweetAlert from '@components/alert';
import { BaseButton, FlexColumn } from '@styled/components';

const Wrapper = styled.section`
  ${FlexColumn}
`;

const FilesWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const File = styled.div`
  padding: 2rem;
  background: ${props => props.theme.bg.primary};
  box-shadow: ${props => props.theme.boxShadow};
  margin-right: 2rem;
  margin-bottom: 2rem;

  @media (max-width: 500px) {
    margin-right: 0;
  }

  p {
    margin: 0.5rem 0;
  }
`;

const Button = styled(BaseButton)`
  background: ${props => props.theme.bg.accent};
  padding: 4px 16px;
  color: ${props => props.theme.colors.white};
  margin-top: 1rem;
`;

const redux = createSelector(
  state => state.file,
  file => ({ ...file })
);

const transformSize = size => {
  const t = 1000;
  if (size < t) return `${size} KB`;
  if (size < t * t) return `${size} MB`;
  return `${size} GB`;
};

const Files = () => {
  const dispatch = useDispatch();
  const { loading, files, message, status } = useSelector(redux);

  const clearMessage = () => dispatch(clearFileMessage);

  const download = (path, name) => () => dispatch(downloadFile(path, name));

  useEffect(() => {
    dispatch(getFiles);
    return () => {
      dispatch(resetFiles);
      dispatch(clearFileMessage)
    };
  }, [dispatch]);

  if (loading || !files)
    return (
      <Wrapper>
        <Spinner />
      </Wrapper>
    );

  return (
    <Wrapper>
      {!files.length && <h1>No Files</h1>}
      <FilesWrapper>
        {files.map(({ name, fileSize, createdAt, path }) => (
          <File key={name}>
            <p>File name - {name}</p>
            <p>Size - {transformSize(fileSize)}</p>
            <p>Upload Date - {new Date(createdAt).toDateString()}</p>
            <Button type="button" onClick={download(path, name)}>
              Download
            </Button>
          </File>
        ))}
      </FilesWrapper>
      {message && (
        <SweetAlert
          message={message}
          type={status === 200 ? 'success' : 'error'}
          callBack={clearMessage}
          withButtons
          failedButton="Close"
          successButton="OK"
        />
      )}
    </Wrapper>
  );
};

export default Files;
