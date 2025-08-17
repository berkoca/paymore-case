interface GetOrdersFilter {
  createdAt?: {
    $lte?: string;
    $gte?: string;
  };
  status?: string;
}

export default GetOrdersFilter;
