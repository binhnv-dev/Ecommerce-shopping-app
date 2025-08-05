import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface PaginationProps {
  page: number;
  pages: number;
  handlePagenationChangeSubmit: (type: string, page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ page, pages, handlePagenationChangeSubmit }) => {
  const [currentPage, setCurrentPage] = useState(page || 1);
  const productsPerPage = 8;

  const handleClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    handlePagenationChangeSubmit('pagination', pageNumber);
  };

  const prev = currentPage > 1 ? currentPage - 1 : 1;
  const next = currentPage < pages ? currentPage + 1 : pages;

  const pageNumbers = [];
  for (let i = 1; i <= pages; i++) {
    pageNumbers.push(i);
  }

  return (
    <View style={styles.pagination}>
      <TouchableOpacity
        disabled={currentPage === 1}
        onPress={() => handleClick(prev)}
        style={[styles.pageItem, currentPage === 1 && styles.disabledItem]}
      >
        <Text style={styles.pageLink}>Prev</Text>
      </TouchableOpacity>
      {pageNumbers.map((number) => (
        <TouchableOpacity
          key={number}
          onPress={() => handleClick(number)}
          style={[styles.pageItem, currentPage === number && styles.activePageItem]}
        >
          <Text style={styles.pageLink}>{number}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        disabled={currentPage === pages}
        onPress={() => handleClick(next)}
        style={[styles.pageItem, currentPage === pages && styles.disabledItem]}
      >
        <Text style={styles.pageLink}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  pageItem: {
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#65676b',
  },
  activePageItem: {
    backgroundColor: '#007bff',
  },
  pageLink: {
    color: '#fff',
  },
  disabledItem: {
    opacity: 0.5,
  }
});

export default Pagination;