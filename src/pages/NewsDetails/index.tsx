import { useAppDispatch } from '@/hooks/redux';
import { NewsActions } from '@/redux/reducers/news/news.action';
import { INews } from '@/types/models/INews';
import { Stack, Text } from '@mantine/core';
import Markdown from 'markdown-to-jsx';
import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
export const NewsDetails: React.FC = () => {
  const { id } = useParams();
  const [news, setNews] = useState<INews>();
  const dispatch = useAppDispatch();

  const getRoomByID = useCallback(() => {
    if (id) {
      dispatch(
        NewsActions.getNewsById(id, {
          onSuccess: (data: INews) => {
            setNews(data);
          }
        })
      );
    }
  }, [dispatch, id]);

  useEffect(() => {
    getRoomByID();
  }, [dispatch, getRoomByID, id]);

  return (
    <Stack spacing={'md'}>
      <Text fw={500} fz={'lg'}>
        Thông tin chi tiết tin tức
      </Text>

      <Stack spacing={'xs'}>
        <Text fw={500}>Tiêu đề: </Text>
        <Text color="dimmed">{news?.title}</Text>
      </Stack>

      <Stack spacing={'xs'}>
        <Text fw={500}>Nội dung: </Text>
        <Text color="dimmed">
          <Markdown>{news?.content || ''}</Markdown>
        </Text>
      </Stack>
    </Stack>
  );
};
