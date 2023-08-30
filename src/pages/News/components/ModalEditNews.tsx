/* eslint-disable no-useless-catch */
import { INews } from '@/types/models/INews';
import { Button, Group, Stack, Text, TextInput } from '@mantine/core';

import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '@/configs/firebase';
import { uniqueId } from 'lodash';
import { useState } from 'react';
import { useAppDispatch } from '@/hooks/redux';
import { NewsActions } from '@/redux/reducers/news/news.action';

class MyUploadAdapter {
  loader: any;
  constructor(loader: any) {
    this.loader = loader;
  }

  async upload() {
    const file = await this.loader.file;
    const imageRef = ref(storage, `images/${file.name}_${uniqueId()}`);
    try {
      const snapshot = await uploadBytes(imageRef, file);
      const downloadUrl = await getDownloadURL(snapshot.ref);
      return { default: downloadUrl };
    } catch (error) {
      throw error;
    }
  }
}

interface Props {
  news: INews | undefined;
  close: () => void;
}

export const ModalEditNews = ({ news, close }: Props) => {
  function uploadPlugin(editor: any) {
    editor.plugins.get('FileRepository').createUploadAdapter = (
      loader: any
    ) => {
      return new MyUploadAdapter(loader);
    };
  }

  const [title, setTitle] = useState(news?.title);
  const [content, setContent] = useState(news?.content);
  const dispatch = useAppDispatch();

  const handleCancel = () => {
    close();
  };

  const handleUpdate = () => {
    if (title && content && news?.id) {
      dispatch(
        NewsActions.updateNews(
          news?.id,
          { title, content },
          {
            onSuccess: () => {
              dispatch(NewsActions.getAllNews());
              close();
            }
          }
        )
      );
    }
  };

  return (
    <Stack spacing={'xs'}>
      <TextInput
        label="Tiêu đề"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Stack spacing={0}>
        <Text fw={500} fz={'sm'} mb={'0'}>
          Nội dung
        </Text>
        <CKEditor
          config={{
            extraPlugins: [uploadPlugin]
          }}
          editor={ClassicEditor}
          // onChange={(e) => {
          //   setLocalDraft((prev) => ({ ...prev, markdown: e.target.value }));
          //   setPost((prev) => {
          //     return { ...prev, markdown: e.target.value };
          //   });
          // }}
          data={content}
          onChange={(event, editor) => {
            setContent(editor.getData());
          }}
        />
      </Stack>
      <Group position="right">
        <Button variant="outline" onClick={handleCancel}>
          Huỷ
        </Button>
        <Button onClick={() => handleUpdate()}>Cập nhật</Button>
      </Group>
    </Stack>
  );
};
