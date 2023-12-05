function NestedContent({ record }: any) {
  const formattedMessage = record?.message ? record.message.replace(/\n/g, '<br>') : '';

  return (
    <div className='px-[4.25rem] py-4 max-w-[75rem] w-full break-words whitespace-normal'>
      <span className='text-2xl' dangerouslySetInnerHTML={{ __html: formattedMessage }} />
    </div>
  );
}

export default NestedContent;
