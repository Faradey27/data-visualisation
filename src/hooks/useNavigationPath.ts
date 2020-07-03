export const useNavigationPath = () => {
  // this is mocked implementation, I just hardcoded breadcrumbs to be able to visialize them
  // in real life they can come from real navigation or storage

  return [
    { label: 'dashbird.io', id: 'dashbird', href: "#dashbird" },
    { label: 'US-EAST-1', id: 'us-east-1', href: "#us-east-1" },
    { label: 'SQS', id: 'sqs', href: "#sqs" }
  ];
}